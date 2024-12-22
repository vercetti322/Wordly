import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

export default function useWebSockets() {
    const [registered, setRegistered] = useState(false);
    const [playerId, setPlayerId] = useState(null);
    const [game, setGame] = useState(null);
    const stompClientRef = useRef(null);
    const [playerCount, setPlayerCount] = useState(0);

    const register = (name) => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = over(socket);
        stompClientRef.current = stompClient;

        const onConnected = () => {
            stompClient.subscribe('/player', (message) => {
                setPlayerCount(message.body);
            });

            stompClient.subscribe(`/player/${name}`, (message) => {
                setPlayerId(message.body);
            });

            stompClient.send('/game-api/register', {}, name);

            setRegistered(true);
        };

        const onDisconnected = () => {
            setRegistered(false);
        };

        const onError = (err) => {
            console.error(err);
            onDisconnected();
        };

        stompClient.connect({}, onConnected, onError);

    };

    useEffect(() => {
        if (playerId && stompClientRef.current) {
            stompClientRef.current.subscribe(`/player/gameObject/${playerId}`, (gameMessage) => {
                const game = JSON.parse(gameMessage.body);
                console.log(game);
                setGame(game);
            });

            if (game) {
                stompClientRef.current.subscribe(`/game/${game.gameId}`, (gameMessage) => {
                    const status = gameMessage.body;
                    if (status === 'ended') {
                        console.log('game ended');
                        window.location.reload();
                    }
                });
            }

        }

        return () => {
            if (stompClientRef.current && playerId) {
                stompClientRef.current.unsubscribe(`/player/${playerId}`);
                if (game) {
                    stompClientRef.current.unsubscribe(`/game/${game.gameId}`);
                }
            }
        };
    }, [playerId, game]);

    return { registered, playerId, playerCount, register, stompClient: stompClientRef.current, game };
}

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
                stompClientRef.current.unsubscribe(`/player/${name}`);
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
                setGame(game);
            });

            stompClientRef.current.subscribe(`/player/end/${playerId}`, (endMessage) => {
                if (endMessage.body === "end" && game) {
                    const notification = document.createElement('div');
                    notification.textContent = "Other player disconnected, reverting back...";
                    notification.style.position = 'fixed';
                    notification.style.top = '20px';
                    notification.style.right = '20px';
                    notification.style.backgroundColor = '#333';
                    notification.style.color = 'white';
                    notification.style.padding = '15px';
                    notification.style.borderRadius = '5px';
                    notification.style.zIndex = '1000';
                    document.body.appendChild(notification);
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000)
                }
            });

            if (game) {
                stompClientRef.current.subscribe(`/game/moves/${game.gameId}`, (gameMessage) => {
                    const game = JSON.parse(gameMessage.body);
                    setGame(game);
                });

                stompClientRef.current.subscribe(`/game/end/${game.gameId}`, (endMessage) => {
                    const message = endMessage.body;
                    if (message === "tie") {
                        const notification = document.createElement('div');
                        notification.textContent = "It was a tie, well played..";
                        notification.style.position = 'fixed';
                        notification.style.top = '20px';
                        notification.style.right = '20px';
                        notification.style.backgroundColor = '#333';
                        notification.style.color = 'white';
                        notification.style.padding = '15px';
                        notification.style.borderRadius = '5px';
                        notification.style.zIndex = '1000';
                        document.body.appendChild(notification);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000)
                    } else {
                        if (message === playerId) {
                            const notification = document.createElement('div');
                            notification.textContent = "You won!!, what a game!";
                            notification.style.position = 'fixed';
                            notification.style.top = '20px';
                            notification.style.right = '20px';
                            notification.style.backgroundColor = '#333';
                            notification.style.color = 'white';
                            notification.style.padding = '15px';
                            notification.style.borderRadius = '5px';
                            notification.style.zIndex = '1000';
                            document.body.appendChild(notification);
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000)
                        } else {
                            const notification = document.createElement('div');
                            notification.textContent = "You lost!!, better luck next time..";
                            notification.style.position = 'fixed';
                            notification.style.top = '20px';
                            notification.style.right = '20px';
                            notification.style.backgroundColor = '#333';
                            notification.style.color = 'white';
                            notification.style.padding = '15px';
                            notification.style.borderRadius = '5px';
                            notification.style.zIndex = '1000';
                            document.body.appendChild(notification);
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000)
                        }
                    }
                });
            }
        }

        return () => {
            if (stompClientRef.current && playerId) {
                stompClientRef.current.unsubscribe(`/player`);
                stompClientRef.current.unsubscribe(`/player/end/${playerId}`);
                stompClientRef.current.unsubscribe(`/player/gameObject/${playerId}`);
                if (game) {
                    stompClientRef.current.unsubscribe(`/game/moves/${game.gameId}`);
                    stompClientRef.current.unsubscribe(`/game/end/${game.gameId}`);
                }
            }
        };
    }, [playerId, game]);

    return { registered, playerId, playerCount, register, stompClient: stompClientRef.current, game };
}

import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const AuctionCountdown = ({ startBidDateTime, endBidDateTime }) => {
    const [timeState, setTimeState] = useState({
        status: "loading", // loading | not-started | active | ended | invalid
        message: "",
        timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 }
    });
    const calculateTimeState = () => {
        const now = new Date();
        const startTime = new Date(startBidDateTime);
        const endTime = new Date(endBidDateTime);

        // Validate dates first
        if (!startBidDateTime || !endBidDateTime ||
            isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
            return {
                status: "invalid",
                message: "Invalid auction dates",
                timeLeft: null
            };
        }

        if (now < startTime) {
            // Before auction starts
            const diff = startTime - now;
            return {
                status: "not-started",
                message: "Starts in",
                timeLeft: {
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / (1000 * 60)) % 60),
                    seconds: Math.floor((diff / 1000) % 60)
                }
            };
        } else if (now >= startTime && now < endTime) {
            // During auction
            const diff = endTime - now;
            return {
                status: "active",
                message: "Ends in",
                timeLeft: {
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / (1000 * 60)) % 60),
                    seconds: Math.floor((diff / 1000) % 60)
                }
            };
        } else {
            // After auction ends
            return {
                status: "ended",
                message: "✅ Auction Ended",
                timeLeft: null
            };
        }
    };
    useEffect(() => {
        let timer;
        const updateState = () => {
            setTimeState(calculateTimeState());
        };

        updateState(); // Initial calculation

        const currentState = calculateTimeState();
        const needsInterval = currentState.status === "not-started" || currentState.status === "active";

        if (needsInterval) {
            timer = setInterval(updateState, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [startBidDateTime, endBidDateTime]);

    const formatTimeUnit = (unit) => unit.toString().padStart(2, '0');

    // Inline styles
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center'
        },
        statusMessage: {
            fontWeight: '500',
            borderRadius: '4px',
            padding: '4px 8px'
        },
        timeLabel: {
            fontSize: '0.875rem',
            // marginRight: '8px'
        },
        timeBadge: {
            fontSize: '1rem',
            fontWeight: '500',
            padding: '0px 3px',
            borderRadius: '4px',
            backgroundColor: '#f8f9fa',
            color: '#CD1212',
            // minWidth: '2.5rem',
            textAlign: 'center'
        },
        statusStyles: {
            "not-started": {
                textColor: '#fd7e14',
                bgColor: 'rgba(253, 126, 20, 0.1)'
            },
            "active": {
                textColor: '#0d6efd',
                bgColor: 'transparent'
            },
            "ended": {
                textColor: '#198754',
                bgColor: 'rgba(25, 135, 84, 0.1)'
            },
            "invalid": {
                textColor: '#dc3545',
                bgColor: 'rgba(220, 53, 69, 0.1)'
            }
        }
    };

    const currentStatusStyle = styles.statusStyles[timeState.status] || styles.statusStyles.active;

    return (
        <div style={styles.container}>
            {timeState.status === "ended" || timeState.status === "invalid" ? (
                <span style={{
                    ...styles.statusMessage,
                    color: currentStatusStyle.textColor,
                    backgroundColor: currentStatusStyle.bgColor
                }}>
                    {timeState.message}
                </span>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', }}>
                    <span style={{
                        ...styles.timeLabel,
                        color: currentStatusStyle.textColor
                    }}>
                        {/* {timeState.message}: */}
                    </span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {timeState.timeLeft.days > 0 && (
                            <span style={styles.timeBadge}>
                                {formatTimeUnit(timeState.timeLeft.days)}d
                            </span>
                        )}
                        <span style={styles.timeBadge}>
                            {formatTimeUnit(timeState.timeLeft.hours)}h
                        </span>
                        <span style={styles.timeBadge}>
                            {formatTimeUnit(timeState.timeLeft.minutes)}m
                        </span>
                        <span style={styles.timeBadge}>
                            {formatTimeUnit(timeState.timeLeft.seconds)}s
                        </span>
                        <span style={styles.timeBadge}>
                            {'left'}
                            {/* {formatTimeUnit(timeState.timeLeft.seconds)}s */}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

AuctionCountdown.propTypes = {
    startBidDateTime: PropTypes.string.isRequired,
    endBidDateTime: PropTypes.string.isRequired
};

export default AuctionCountdown;

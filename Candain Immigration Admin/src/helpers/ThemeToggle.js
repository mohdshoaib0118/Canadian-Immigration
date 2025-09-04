import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeLayoutColor, changeSidebarTheme } from '../redux/actions'; 
import * as layoutConstants from '../constants/layout'; 
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const [colorMode, setColorMode] = useState(
        localStorage.getItem('colorMode') || layoutConstants.LAYOUT_COLOR_LIGHT
    );

    const applyColorScheme = (mode) => {
        if (mode === layoutConstants.LAYOUT_COLOR_DARK) {
            dispatch(changeLayoutColor(layoutConstants.LAYOUT_COLOR_DARK));
            dispatch(changeSidebarTheme(layoutConstants.LEFT_SIDEBAR_THEME_DARK));
        } else {
            dispatch(changeLayoutColor(layoutConstants.LAYOUT_COLOR_LIGHT));
            dispatch(changeSidebarTheme(layoutConstants.LEFT_SIDEBAR_THEME_LIGHT));
        }
    };

    const handleToggle = () => {
        const newMode =
            colorMode === layoutConstants.LAYOUT_COLOR_LIGHT
                ? layoutConstants.LAYOUT_COLOR_DARK
                : layoutConstants.LAYOUT_COLOR_LIGHT;

        setColorMode(newMode);
        localStorage.setItem('colorMode', newMode);
        applyColorScheme(newMode);
    };

    useEffect(() => {
        applyColorScheme(colorMode);
    }, [colorMode]);

    return (
        <div className="d-flex align-items-center justify-content-center">
            {colorMode === layoutConstants.LAYOUT_COLOR_LIGHT ? (
                <>
                    <OverlayTrigger
                        placement="left"
                        overlay={
                            <Tooltip id="overlay-example">
                                Dark Mode
                            </Tooltip>
                        }>

                        <i className="mdi mdi-moon-waning-crescent fs-4 p-0 fw-bold" onClick={handleToggle}></i>
                    </OverlayTrigger>
                </>
            ) : (
                <>
                    <OverlayTrigger
                        placement="left"
                        overlay={
                            <Tooltip id="overlay-example">
                                Light Mode
                            </Tooltip>
                        }>

                        <i className="mdi mdi-white-balance-sunny text-warning fs-4 p-0 fw-bold" onClick={handleToggle}></i>
                    </OverlayTrigger>
                </>
            )}

        </div>
    );
};

export default ThemeToggle;
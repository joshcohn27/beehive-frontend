import React, { useState } from 'react'
import { SessionUser, useAuthStore, setLogout } from '../utils/AuthStore';
import UserPlaceholderImage from "../assets/user_placeholder.svg";
import DropDownImage from '../assets/dropdown.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const user = useAuthStore((s) => s.user);
    const expiresAt = useAuthStore((s) => s.expiresAt);

    if (expiresAt && Date.now() >= expiresAt && user) {
        setLogout();
    }

    const headerStyle: React.CSSProperties = {
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1em 3em',
        backgroundColor: 'var(--foreground-color, #ffffff)',
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const navStyle: React.CSSProperties = {
        display: 'flex',
        gap: '1.5em',
        alignItems: 'center',
    };

    const linkStyle: React.CSSProperties = {
        cursor: 'pointer',
        fontWeight: 600,
    };

    function goToMainSite() {
        window.open("https://joshbcohn.com/projects");
    }

    function goToGitHub() {
        window.open("https://github.com/joshcohn27/beehive-frontend", "_blank");
    }

    return (
        <div style={headerStyle}>
            <div>
                <p style={{ fontWeight: 500 }}>
                    <span style={{ fontWeight: 700 }}>Bee</span>Monitor
                </p>
            </div>

            {/* NEW NAV SECTION */}
            <div style={navStyle}>
                <p style={linkStyle} onClick={goToMainSite}>Main Site</p>
                <p style={linkStyle} onClick={goToGitHub}>View Code</p>
            </div>

            <div>
                {user && <UserDropDown user={user} />}
            </div>
        </div>
    );
};

interface UserDropDownProps {
    user?: SessionUser;
}

const UserDropDown = ({ user }: UserDropDownProps) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const userDropdownStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75em',
        padding: '0.25em 0.5em',
        cursor: 'pointer',
        position: 'relative',
    };

    const userImageStyle = {
        width: '2em',
        clipPath: 'circle()',
        padding: ".1em",
        backgroundColor: '#cccccc',
    };

    const dropDownContentsStyle: React.CSSProperties = {
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        backgroundColor: '#E5E5E5',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1em',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5em',
        zIndex: 100,
    };

    const dropDownItemStyle = {
        padding: '0.25em',
        width: '100%',
    };

    function handleUserDropdown() {
        setIsOpen(!isOpen);
    }

    function handleSettings() {
        navigate("/SettingsPage");
    }

    return (
        <div style={userDropdownStyle} onClick={handleUserDropdown}>
            <img src={UserPlaceholderImage} alt={`${user?.firstName}'s avatar`} style={userImageStyle} />
            <p>Hi, {user?.firstName}</p>
            <img src={DropDownImage} alt="Dropdown arrow" />

            {isOpen &&
                <div style={dropDownContentsStyle}>
                    <div style={dropDownItemStyle}>
                        <p style={{ margin: 0, cursor: "pointer" }} onClick={handleSettings}>Settings</p>
                    </div>
                    <div style={dropDownItemStyle}>
                        <p style={{ margin: 0, cursor: "pointer" }} onClick={() => { setLogout() }}>Logout</p>
                    </div>
                </div>
            }
        </div>
    );
};

export { Header };
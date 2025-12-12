"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaHome, FaPlusSquare, FaBoxOpen } from 'react-icons/fa'; 

export default function Header() {
    const router = useRouter();
    const pathname = usePathname(); 

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: FaHome },
        { name: 'Criar', path: '/criar', icon: FaPlusSquare },
        { name: 'Estoque', path: '/estoque', icon: FaBoxOpen },
    ];

    const handleNavigation = (path) => {
        router.push(path);
    };

    return (
        <header style={styles.header}>
            <div style={styles.logo}>
                SAEP
            </div>
            <nav style={styles.nav}>
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    const IconComponent = item.icon;

                    return (
                        <button
                            key={item.name}
                            onClick={() => handleNavigation(item.path)}
                            style={isActive ? styles.navLinkActive : styles.navLink}
                        >
                            <IconComponent style={styles.icon} />
                            {item.name}
                        </button>
                    );
                })}
            </nav>
        </header>
    );
}

// --- Estilos de Componente ---
const styles = {
    header: {
        backgroundColor: '#333',
        color: 'white',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    logo: {
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
    nav: {
        display: 'flex',
        gap: '20px',
    },
    navLink: {
        backgroundColor: 'transparent',
        color: '#ccc',
        border: 'none',
        padding: '10px 15px',
        cursor: 'pointer',
        fontSize: '1em',
        transition: 'color 0.3s',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '4px',
    },
    navLinkActive: {
        backgroundColor: '#555',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        cursor: 'default',
        fontSize: '1em',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '4px',
    },
    icon: {
        fontSize: '1.1em',
    }
};
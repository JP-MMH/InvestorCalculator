import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

const navLinks = [
    { name: 'Scenario', href: '#top' },
    { name: 'Allocation', href: '#allocation' },
    { name: 'Safety', href: '#safety' },
    { name: 'Comparison', href: '#comparison' },
    { name: 'Risks', href: '#risk' },
];

export const NavbarPill: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href === '#top' ? 'body' : href);
        if (element) {
            const navHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <>
            {/* Fixed Header with Logo - Always visible */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-mmh-investor-blue border-b border-mmh-gold/20">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo - Top left with clearspace */}
                        <div className="flex items-center">
                            <img
                                src="/logo-emblem.png"
                                alt="Mater Maria Wellness Homes"
                                className="h-12 w-auto"
                                style={{ padding: '8px' }} // Star height × 4 clearspace approximation
                            />
                            <div className="ml-4">
                                <div className="text-mmh-gold font-serif font-bold text-lg">Mater Maria</div>
                                <div className="text-mmh-ivory/60 text-xs uppercase tracking-wider">Wellness Homes</div>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.href)}
                                    className="px-4 py-2 text-sm font-medium text-mmh-gold hover:text-mmh-ivory hover:bg-mmh-gold/10 rounded-full transition-all"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Floating Pill Navigation - Shows on scroll */}
            <div className={cn(
                "fixed top-24 left-0 right-0 z-40 flex justify-center transition-all duration-300 pointer-events-none",
                isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}>
                <div className="bg-mmh-gold/95 backdrop-blur-md text-mmh-investor-blue rounded-full shadow-lg px-2 py-1.5 flex items-center gap-1 pointer-events-auto border border-mmh-gold">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.href)}
                            className="px-4 py-2 rounded-full text-xs font-bold hover:bg-mmh-investor-blue/20 transition-colors"
                        >
                            {link.name}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

import React, { useState, useEffect, useRef } from 'react';

export default function useDraggableModal() {
    
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const modalRef = useRef<any>(null);
    

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (isDragging && modalRef.current) {
                const newX = event.clientX - dragOffset.x;
                const newY = event.clientY - dragOffset.y;

                const modalWidth = modalRef.current.offsetWidth;
                const modalHeight = modalRef.current.offsetHeight;

                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;

                const maxX = windowWidth - modalWidth;
                const maxY = windowHeight - modalHeight;

                const constrainedX = Math.min(Math.max(0, newX), maxX);
                const constrainedY = Math.min(Math.max(0, newY), maxY);

                modalRef.current.style.left = constrainedX + 'px';
                modalRef.current.style.top = constrainedY + 'px';
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    const handleMouseDown : any = (event: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current) {
            setIsDragging(true);
            const { left, top } = modalRef.current.getBoundingClientRect();
            setDragOffset({
                x: event.clientX - left,
                y: event.clientY - top,
            });
        }
    };

    return { modalRef, handleMouseDown, isDragging };
};

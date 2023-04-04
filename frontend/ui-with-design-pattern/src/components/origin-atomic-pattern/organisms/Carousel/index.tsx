import Image from 'next/image';

const Carousel = () => {
    const srcs = [
        '/assets/movie-1.jpg',
        '/assets/movie-2.jpg',
        '/assets/movie-3.jpg',
        '/assets/movie-4.jpg',
    ];

    return (
        <div className="carousel">
            <div className="carousel-slides" style={{ height: '300px' }}>
                {srcs.map((src, index) => (
                    <div
                        key={`${src}-carousel-item-${index}`}
                        style={{ position: 'relative', width: '500px', height: '100%' }}
                    >
                        <Image src={src} alt="" fill />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;

import styles from './carousel.module.css';

const Carousel = ({ children }) => {
    const width = '500px';
    const height = '300px';
    return (
        <div className={styles['carousel']}>
            <div className={styles['carousel-slides']}>{children}</div>
        </div>
    );
};

export default Carousel;

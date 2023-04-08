import styles from './carousel.module.css';

const Carousel = ({ children }) => {
    console.log(Array.isArray(children));

    return (
        <div className={styles['carousel']}>
            <button>left</button>
            <button>right</button>
            <div className={styles['carousel-slides']}>{children}</div>
        </div>
    );
};

export default Carousel;

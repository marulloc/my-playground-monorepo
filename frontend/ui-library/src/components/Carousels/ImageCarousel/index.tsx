import React from 'react';
import styles from './imageCarousel.module.css';

type Props = {
    srcArr: Array<string>;
};

const ImageCarousel: React.FC<Props> = ({ srcArr }) => {
    return <div className={styles.carousel}></div>;
};

export default React.memo(ImageCarousel);

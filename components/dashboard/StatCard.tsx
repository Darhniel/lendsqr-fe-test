import styles from "./StatCard.module.scss";

interface Props {
    title: string;
    value: string;
    icon: React.ElementType;
    color?: string;
    size?: number;
}

export default function StatCard({ title, value, icon: Icon, color="", size }: Props) {
    return (
        <div className={styles.card}>
            <div className={styles.iconWrapper}>
                <Icon color={color} size={size || 20}/>
            </div>
            <p className={styles.title}>{title}</p>
            <h3 className={styles.h3}>{value}</h3>
        </div>
    );
}

import styles from './Input.module.css'
export default function Input({ defaultValue, label, name, placeholder, type, onChange }) {
  return (
		<div>
		<p className={styles.label}>{label}</p>
    <input
      type={type}
      defaultValue={defaultValue}
      name={name}
      className={styles['input-form']}
      placeholder={placeholder}
      onChange={onChange}
    />
		</div>
  )
}

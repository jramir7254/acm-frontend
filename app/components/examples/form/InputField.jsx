export default function InputField({ label, name, value, onChange, error }) {
    return (
        <div>
            <label>{label}</label>
            <input name={name} value={value} onChange={onChange} />
            {error && <span className="error">{error}</span>}
        </div>
    );
}

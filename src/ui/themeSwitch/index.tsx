import './style.css'
const ThemeSwitch = ({ value, onChange }: { value: boolean, onChange: (val: boolean) => void }) => {
    return (
        <div className="checkbox-wrapper-54">
            <label className="switch">
                <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className="slider"></span>
            </label>
        </div>
    )
}

export default ThemeSwitch
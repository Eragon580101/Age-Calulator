import { forwardRef } from 'react';
import './Input.scss';


const Input = forwardRef((props, ref) => {

    return (
        <div className="input">
            <label ref={ref[2]} aria-label='label' htmlFor="input" className='input__label'>{props.label}</label>
            <input ref={ref[0]} type='number' name='input' id='input' className='input__field' placeholder={props.placeholder}/>
            <p ref={ref[1]} className='error hidden'>This field is required</p>
        </div>
    )
})

Input.defaultProps = {
    label: '00',
    placeholder: 'Label'
}

export default Input
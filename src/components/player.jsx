import "./player.css";

export default function Player() {
    return (
        <div className='player'>
            <div className='buttons'>
                <svg
                    className='prev btn'
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='16'
                    viewBox='0 0 18 16'
                    fill='none'
                >
                    <path
                        d='M3.75 8.43262C3.4169 8.24014 3.4169 7.75987 3.75 7.56738L12.75 2.3711C13.0833 2.17867 13.4999 2.41889 13.5 2.80371L13.5 13.1963C13.4999 13.5811 13.0833 13.8213 12.75 13.6289L3.75 8.43262Z'
                        fill='white'
                        stroke='white'
                    />
                    <line
                        x1='1.7998'
                        y1='14.2'
                        x2='1.79981'
                        y2='2.59995'
                        stroke='white'
                        stroke-width='2'
                        stroke-linecap='round'
                    />
                </svg>
                <svg
                    className='pause-play btn'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='25'
                    viewBox='0 0 24 25'
                    fill='none'
                >
                    <path
                        d='M22.5751 11.643C23.2212 12.0316 23.2212 12.9684 22.5751 13.357L7.51538 22.414C6.84888 22.8148 6 22.3348 6 21.557L6 3.443C6 2.66525 6.84887 2.1852 7.51538 2.58604L22.5751 11.643Z'
                        fill='white'
                    />
                </svg>
                <svg
                    className='next btn'
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='15'
                    viewBox='0 0 18 15'
                    fill='none'
                >
                    <path
                        d='M14.1377 7.06055C14.4864 7.24974 14.4864 7.75026 14.1377 7.93945L5.23828 12.7568C4.90513 12.9372 4.5 12.6952 4.5 12.3164L4.5 2.68359C4.5 2.30478 4.90514 2.06284 5.23828 2.24316L14.1377 7.06055Z'
                        fill='white'
                        stroke='white'
                    />
                    <line
                        x1='16.2002'
                        y1='1.75'
                        x2='16.2002'
                        y2='12.5'
                        stroke='white'
                        stroke-width='2'
                        stroke-linecap='round'
                    />
                </svg>
            </div>
            <div className='bar'>
                <span>00:00</span>
                <div className='slider'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='345'
                        height='2'
                        viewBox='0 0 345 2'
                        fill='none'
                    >
                        <path d='M0 1H345' stroke='white' />
                    </svg>
                    <div className='progress'></div>
                </div>

                <span>00:00</span>
            </div>
        </div>
    );
}

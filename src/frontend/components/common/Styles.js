import { css } from 'glamor';

const wrapperBaseStyle = css({
    display: 'block',
    margin: '0 auto 20px',
    textAlign: 'left',
});
const labelBaseStyle = css({
    display: 'inline-block',
});
const inputBaseStyle = css({
    display: 'inline-block',
    marginLeft: 12,
    boxSizing: 'border-box',
    border: '1px solid #aeaeae',
    borderRadius: 4,
    padding: '4px 8px',
    backgroundColor: '#f0f0f0',
    fontSize: 14,
    color: '#000',
});

export { wrapperBaseStyle, labelBaseStyle, inputBaseStyle };

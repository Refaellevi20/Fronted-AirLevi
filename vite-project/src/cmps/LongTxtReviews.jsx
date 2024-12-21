import { useState } from 'react';

export function LongTxtReviews({ txt, length, onShowMoreClick }) {
    const [isShowMore, setShowMore] = useState(false)

    function getTxtToShow(txt, length) {
        return (txt.length < length || isShowMore) ? txt : txt.substring(0, length + 1) + '...'
    }

    function onToggleLongTxt() {
        // setShowMore(prevLongTxtShown => !prevLongTxtShown)
        if (!isShowMore) onShowMoreClick()
            
    }

    return (
        <article className="long-txt">
            <p>{getTxtToShow(txt, length)}</p>
            {txt.length > length && (
                <button className='button-longText' onClick={onToggleLongTxt}>
                    {isShowMore ? '-See less' : '+See more'}
                </button>
            )}
        </article>
    )
}

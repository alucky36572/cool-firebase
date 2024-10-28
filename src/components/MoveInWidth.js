import { useEffect, useRef, useState } from "react"

export default function MoveInWidth({ displayed, height }) {
    // 需要獲取傳入的displayed區塊的寬度
    const displayedWrapper = useRef(null)
    const [containerHeight, setContainerHeight] = useState('0px')
    const container = useRef(null)
    const [progress, setProgress] = useState(0) // 儲存滾動進度
    const [wrapperWidth, setWrapperWidth] = useState(0)


    useEffect(() => {
        if (!height) {
            setContainerHeight(
                `${(innerHeight * displayedWrapper.current.offsetWidth) / innerWidth
                }px`
            )
        } else {
            setContainerHeight(height)
        }

        setWrapperWidth(displayedWrapper.current.offsetWidth)
    }, [height])

    const updateProgress = () => {
        const { scrollTop } = document.documentElement // 獲取當前頁面的滾動位置
        const containerTop = container.current.offsetTop
        const containerHeightNumber = container.current.offsetHeight

        const newProgress =
            ((scrollTop - containerTop) * 100) / (containerHeightNumber - innerHeight)

        setProgress(newProgress)
    }

    useEffect(() => {
        updateProgress()
        addEventListener('scroll', updateProgress)
        return () => removeEventListener('scroll', updateProgress)
    }, [])

    return (
        <div
            style={{
                height: containerHeight,
                overflow: 'hidden',
                position: 'relative',
            }}
            ref={container}
        >
            <div
                style={{
                    display: 'inline-block',
                    height: '100vh',
                    transform:
                        progress >= 0
                            ? progress > 100
                                ? `translateX(-${(100 * (wrapperWidth - innerWidth)) / wrapperWidth
                                }%)`
                                : `translateX(-${progress * ((wrapperWidth - innerWidth) / wrapperWidth)
                                }%)`
                            : 'translateX(0%)',
                    position:
                        progress <= 100 ? (progress >= 0 ? 'fixed' : 'static') : 'absolute',
                    bottom: 0
                }}
                ref={displayedWrapper}
            >
                {displayed}
            </div>
        </div>
    )
}


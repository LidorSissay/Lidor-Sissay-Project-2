interface TitleProps {
    title: string
}
const Title = (props: TitleProps) => {
    const { title } = props
    return (
        <div className="Title">
            <h2>{title}</h2>
        </div>
    )
}
export default Title
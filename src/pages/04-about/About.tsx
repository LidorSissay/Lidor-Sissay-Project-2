import Title from "../../components/09-title/Title"
import myImage from '../../assets/image.png'

const About = () => {
    return (
        <div className="About">
            <Title title="About" />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta expedita, laborum iusto omnis vel asperiores ipsum modi error voluptatem dolore, culpa reiciendis repudiandae ipsa natus.</p>
            <h4>Lidor Sissay</h4>
            <img src={myImage} alt='myImage' />
        </div>
    )
}
export default About
import { useEffect, useState } from 'react'
import axios from 'axios'
import './AboutUs.css'

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {

    // state variables to hold the about us data
    const [aboutUsData, setAboutUsData] = useState({
        title: '',
        intro: '',
        experiences: '',
        hobbies: '',
        imageUrl: ''
    });

    // fetch the data once when the component first renders
    useEffect(() => {
        const fetchAboutUsData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_HOSTNAME}/about-us`
                )
                console.log(response);
                // console.log(response.data);
                setAboutUsData(response.data.about);
            } catch (error) {
                console.error('Error fetching About Us data:', error);
                // Optionally, handle the error by showing a message or a fallback UI
            }
        };
        fetchAboutUsData(); // get this message from the server
    }, [])

    return (
        <article className="AboutUs-article">
            <h1 className='AboutUs-title'>{aboutUsData.title}</h1>
            <div className="AboutUs-content">
                {aboutUsData.imageUrl && (
                    <div className="AboutUs-image">
                        <img src={aboutUsData.imageUrl} alt="Profile" />
                    </div>
                )}
                <div className="AboutUs-text">
                    <section>
                        <p>{aboutUsData.intro}</p>
                    </section>
                    <br />
                    <section>
                        <p>{aboutUsData.experiences}</p>
                    </section>
                    <br />
                    <section>
                        <p>{aboutUsData.hobbies}</p>
                    </section>
                </div>
            </div>
        </article>
    );
};
export default AboutUs;


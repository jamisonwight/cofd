import { registerBlockType } from '@wordpress/blocks'
import { useEffect, useState } from '@wordpress/element'
import eStyles from '../styles/edit'
import biosJson from '../json/bios.json'


registerBlockType('cofd-blocks/featured-bios', {
    title: 'Featured Bios',
    icon: 'layout',
    category: 'common',
    attributes: {
        featuredBios: {
            type: 'array',
            default: [],
        },
    },
    edit: function (props) {
        const { attributes, setAttributes } = props
        const biosData = Object.values(biosJson)

        const toggleFeaturedBio = (bioID) => {
            let updatedFeaturedBios = [...attributes.featuredBios];

            if (updatedFeaturedBios.includes(bioID)) {
                updatedFeaturedBios = updatedFeaturedBios.filter((id) => id !== bioID);
            } else {
                updatedFeaturedBios.push(bioID);
            }

            setAttributes({ featuredBios: updatedFeaturedBios });
        }

        return (
            <div className={`featured-events pp ${eStyles.main} ${eStyles.flex}`}>
                <h2 className={eStyles.my_sm}>Featured Bios</h2>

                <div className={`item ${eStyles.item} ${eStyles.flex_full}`}>
                    <h3 className={eStyles.my_sm}>Select Featured Bios</h3>
                    <p>Click the bios in the order you want them to be displayed</p>

                    <ul className={`bio-select ${eStyles.postSelect.main}`}>
                        {biosData.map((bio) => (
                            <li
                                key={bio.bioID}
                                onClick={() => toggleFeaturedBio(bio.bioID)}
                                className={attributes.featuredBios.includes(bio.bioID) ? eStyles.postSelect.selected : ''}
                                >
                                <h4 className={`name ${eStyles.postSelect.title}`}>
                                    {bio.bioName}<br></br> 
                                    <small>{bio.bioCareerTitle}</small>
                                </h4>
                                <img className={`image ${eStyles.postSelect.image}`} src={bio.bioImageURL} alt={bio.bioTitle} />
                                {attributes.featuredBios.includes(bio.bioID) && 
                                    <span className={eStyles.postSelect.index}>{attributes.featuredBios.indexOf(bio.bioID) + 1}</span>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    },
    save: function () {
        // Template is in '/dynamic-blocks/featured-bios.php
        return null
    },
});
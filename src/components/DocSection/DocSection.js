import React from "react";
import PropTypes from 'prop-types';
import styles from './DocSection.module.css';
import {Typography} from "@material-ui/core";

function DocSection({
    children = null,
    title = null
}) {
    return (
        <section className={styles.root}>
            {title &&
                <Typography
                    gutterBottom
                    component="h2"
                    variant="h4">
                    {title}
                </Typography>
            }
            {children}
        </section>
    )
}

DocSection.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
};

export default DocSection;

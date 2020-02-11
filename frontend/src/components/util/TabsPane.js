import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useTabsStyles = makeStyles(theme => ({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
}));

const useTabStyles = makeStyles(theme => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$selected': {
            color: '#1890ff',
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    selected: {},
}));

function TabsPane({tabs, children, ...props}) {
    const tabsClasses = useTabsStyles();
    const tabClasses = useTabStyles();

    const [value, onChange] = React.useState(0);

    return (
        <>
            <Tabs classes={tabsClasses} value={value} onChange={(e, v) => onChange(v)} {...props}>
                {
                    tabs.map(
                        (val, i) => {
                            const tabProps = typeof val === "string" || val instanceof String ? {label: val} : val;
                            return <Tab classes={tabClasses} key={i} {...tabProps}/>;
                        }
                    )
                }
            </Tabs>
            {
                children[value]
            }
        </>
    );
}

export default TabsPane;
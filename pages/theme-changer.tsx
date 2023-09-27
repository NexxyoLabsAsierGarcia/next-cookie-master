import { Layout } from "@/components/layouts"
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FC } from "react";
import axios from "axios";
import { GetServerSideProps } from 'next'

interface Props {
    theme: string;
}

const ThemeChangerPage: FC<Props> = ({ theme }) => {

    const [currentTheme, setCurrentTheme] = useState(theme);

    const onThemeChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        const selectedTheme = event.target.value;
        setCurrentTheme(selectedTheme);
        localStorage.setItem('theme', selectedTheme);
        Cookies.set('theme', selectedTheme);
    }

    const onClick = async() => {
        const { data } = await axios.get('/api/hello');
        console.log({ data });
    }

    useEffect(() => {
      console.log('LocalStorage:', localStorage.getItem('theme'));
      console.log('Cookies:', Cookies.get('theme'));
    }, [])
    

    return (
        <Layout>
            <Card>
                <CardContent>
                    <FormControl>
                        <FormLabel>Theme</FormLabel>
                        <RadioGroup value={ currentTheme } onChange={ onThemeChange } >
                            <FormControlLabel value="light" control={<Radio />} label="Light" />
                            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
                            <FormControlLabel value="custom" control={<Radio />} label="Custom" />
                        </RadioGroup>
                    </FormControl>

                    <Button onClick={ onClick }>Request</Button>
                </CardContent>
            </Card>
        </Layout>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async (ctx) => {

    // const cookies = ctx.req.cookies;
    const { theme = 'light'} = ctx.req.cookies;

    const validThemes = ['light', 'dark', 'custom'];

    return {
        props: {
            theme: validThemes.includes(theme) ? theme : 'light'
        }
    }
}

export default ThemeChangerPage;
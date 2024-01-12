import { Box, Link, Flex, Text, Image, Button, Grid, FormControl, FormLabel, Input, Textarea, InputGroup, InputRightElement, Checkbox } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { Link as ReactRouterLink, useNavigate, useLocation } from 'react-router-dom'
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2'
import { Toaster, toast } from 'react-hot-toast'
import { loginUser } from '../api/auth';
import useAuth from '../hooks/useAuth'


const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [data, setData] = useState('');

    const { setAuth, persist, setPersist } = useAuth()!;


    function isValidEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async () => {
        if (!email || !password) {
            toast.error('Please fill all the fields');
        }
        if (!isValidEmail(email)) {
            toast.error('Please enter a valid email');
        }
        try {
            const data = await loginUser(email, password);
            console.log("LOGIN DATA")
            console.log(data);
            if (data.user) {
                setAuth({
                    user: data.user,
                    accessToken: data.accessToken
                });
                toast.success('Logged in successfully');
                //if user is owner, redirect to dashboard
                if (data.user.role === 'owner') {
                    navigate('/owner/dashboard', { replace: true });
                } else {
                    //from and replace are used to redirect the user to the page they were trying to access before logging in
                    navigate(from, { replace: true });
                }
            }
        } catch (err) {
            toast.error('Invalid credentials');
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist.toString());
    }, [persist])


    return (
        <Flex>
            <Box w={{ base: '0%', lg: '50%' }} order={{ base: 2, md: 1 }} display={'hidden'} >
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                {/* Content for the right half */}
                <Link as={ReactRouterLink} to="/" p={{ base: '2', lg: '4' }} fontSize={{ base: 'md', lg: 'xl' }} rounded={'full'} bg={'orange'} shadow={'md'} color={'white'} position={'absolute'} top={'10'} left={'10'}>
                    <FaArrowLeft />
                </Link>
                <Image src={`./assets/login-3.jpg`} h={'full'} alt="Hero" objectFit={'cover'} maxH={'100vh'} ml={0} />
            </Box>

            <Box flex="1" w={{ base: '100%', lg: '50%' }} order={{ base: 1, md: 2 }} py={'20'} pr={{ base: '', md: 48 }} px={{ base: '8' }} justifyContent={"center"} h={'full'}>
                {/* Content for the left half */}
                <Text fontSize="4xl" fontWeight="medium">
                    Login to  <Text as="span" color={"orange.400"}>Foodle</Text>
                </Text>
                <Text fontSize={'md'} mr={'8'}>Welcome to Foodle Food Delivery! Satisfy your cravings with just a few clicks.</Text>
                <Box mt={14}>
                    <FormControl isRequired>
                        <Box >
                            <FormLabel>Email</FormLabel>
                            <Input value={email} onChange={(e) => { setEmail(e.target.value) }} rounded={12} type='email' placeholder='ayush@gmail.com' />
                        </Box>
                        <FormLabel mt={'8'}>Password </FormLabel>
                        <InputGroup size="md">
                            <Input
                                onChange={(e) => { setPassword(e.target.value) }}
                                value={password}
                                pr="4.5rem"
                                rounded={12}
                                type={show ? "text" : "password"}
                                placeholder="Enter password"
                            />
                            <InputRightElement width="4.5rem" onClick={() => setShow(show ? false : true)} cursor={'pointer'}>
                                {show ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Checkbox onChange={togglePersist} checked={persist} mt={6} size='lg' colorScheme='orange' >
                        Trust this device
                    </Checkbox>

                </Box>
                <Flex w={'1/2'} mt={'8'} alignItems={'center'}>
                    <Button onClick={handleSubmit} fontWeight={'bold'} px={'8'} rounded={'full'} mr={6} backgroundColor={'orange.400'}>Login</Button>
                    <Link as={ReactRouterLink} to='/signup'>Don't have an account?<Text as="span" color={'orange.500'}> SignUp</Text></Link>
                </Flex>
            </Box>

        </Flex >

    )
}

export default Login
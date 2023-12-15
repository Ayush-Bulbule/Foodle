import { Box, Link, Flex, Text, Image, Button, Grid, FormControl, FormLabel, Input, Textarea, Toast } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'
import OTPInput from 'react-otp-input'
import toast, { ToastBar, Toaster } from 'react-hot-toast'
import { signupUser } from '../api/auth'

const Signup = () => {
    const [verifyPage, setVerifyPage] = useState(false);
    const [otp, setOtp] = useState('');
    const [data, setData] = useState();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    function isValidEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSubmit = () => {
        console.log(name, email, address, phone, password);
        if (name == "" || email == "" || address == "" || phone == "" || password == "") {
            toast.error("Please fill all the fields!");
            return;
        }

        if (isValidEmail(email) == false) {
            toast.error("Please enter valid email!!");
            return;
        }
        try {
            signupUser(name, email, phone, address, password)
                .then(data => setData(data))
                .catch((error) => {
                    console.log("Error!" + error);
                    toast.error("Something went wrong!!")
                })
            console.log(data ? data : "No data");

        } catch (error) {
            console.log("Error!" + error);
            toast.error("Something went wrong!!")
        }

    }



    return (

        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4} maxH={'100vh'} alignItems={"center"} justifyContent={"center"} h={'full'} >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {
                verifyPage ?
                    (
                        <Box flex={1} display={'flex'} flexDirection={'column'} px={{ base: 10, md: 28 }} py={20} justifyContent={"center"} alignItems={'center'} h={'full'}>
                            {/* Content for the left half */}
                            <Text fontSize="2xl" fontWeight="medium" textAlign={'center'}>
                                Verify your Email
                            </Text>
                            <Text fontSize={'md'} mr={'8'} fontWeight={'light'} mt={4} textAlign={'center'}>Enter the OTP sent to your email address</Text>
                            <Flex justifyContent={'center'} alignItems={'center'} my={12}>
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={4}
                                    inputStyle={{ width: '3rem', height: '3rem', margin: '0 1rem' }}
                                    renderSeparator={<Box p={3}> </Box>}
                                    renderInput={(props) => <Input bg={'gray.50'} {...props} />}
                                />
                            </Flex>

                            <Button
                                rounded={'full'}
                                paddingX={'8'}
                                paddingY={'6'}
                                fontWeight={'bold'}
                                mt={'8'}
                                backgroundColor={'orange.400'}
                                onClick={() => setVerifyPage(false)}
                            >Verify OTP</Button>


                        </Box>
                    ) : (
                        <Box flex="1" py={'8'} px={{ base: 10, md: 28 }} justifyContent={"center"} h={'full'}>
                            {/* Content for the left half */}
                            <Text fontSize="4xl" fontWeight="medium">
                                Signup to  <Text as="span" color={"orange.400"}>Foodle</Text>
                            </Text>
                            <Text fontSize={'md'} mr={'8'}>Welcome to Foodle Food Delivery! Satisfy your cravings with just a few clicks.</Text>
                            <Box mt={14}>
                                <FormControl isRequired>
                                    <FormLabel mt={'8'}>Full Name </FormLabel>
                                    <Input placeholder='Ayush Bulbule' onChange={(e) => setName(e.target.value)} />
                                    <Flex alignItems={'center'} flexDir={{ base: 'column', md: 'row' }} mt={'8'} justifyContent={{ base: 'start', md: 'space-between' }}>
                                        <Box>
                                            <FormLabel>Email</FormLabel>
                                            <Input placeholder='ayush@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                                        </Box>
                                        <Box w={{ ms: '1' }}>
                                            <FormLabel>Phone</FormLabel>
                                            <Input placeholder='+91 84593 20663' onChange={(e) => setPhone(e.target.value)} />
                                        </Box>
                                    </Flex>
                                    <FormLabel mt={'8'}>Password </FormLabel>
                                    <Input placeholder='*****' onChange={(e) => setPassword(e.target.value)} />

                                    <FormLabel mt={'8'}>Address </FormLabel>
                                    <Textarea placeholder='Flat No 101, Ganesh Road, Katraj, Pune - 441043' onChange={(e) => setAddress(e.target.value)} />

                                </FormControl>
                            </Box>
                            <Flex mt={'8'} alignItems={'center'}>
                                <Button onClick={handleSubmit} fontWeight={'bold'} rounded={'full'} mr={6} backgroundColor={'orange.400'}>SignUp</Button>
                                <Link as={RouterLink} to='/login'>Already have an account?<Text as="span" color={'orange.500'}> Login</Text></Link>
                            </Flex>
                        </Box>
                    )
            }

            <Box flex="1" display={'flex'} transform={{ base: 'rotate(90deg)', md: 'rotate(0deg)' }} alignItems={'flex-end'} justifyContent={'flex-end'}>
                {/* Content for the right half */}
                <Image src={`./assets/signup-2.jpg`} maxW={'screen'} alt="Hero" maxH={'100vh'} ml={0} />

            </Box>
        </Grid >
    )
}

export default Signup
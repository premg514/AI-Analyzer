"use client"

import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useDropzone } from "react-dropzone"

import {
    Container,
    FormCard,
    Header,
    Title,
    Subtitle,
    Form,
    FormGroup,
    Label,
    Input,
    DropzoneContainer,
    DropzoneText,
    UploadIcon,
    ImagePreviewContainer,
    ImagePreview,
    Button,
    ErrorMessage,
    SuccessMessage,
    LinkText,
    StyledLink,
    ValidationError,
    Spinner
} from "./signupStyles"

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        profession: "",
        password: "",
    })
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewSrc, setPreviewSrc] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})
    const [success, setSuccess] = useState("")
    const navigate = useNavigate()

    const onDrop = useCallback((acceptedFiles) => {
        // Check if the file is valid (jpg, jpeg, png, or gif)
        const file = acceptedFiles[0]
        if (file) {
            const fileType = file.type
            if (!["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(fileType)) {
                setFieldErrors((prev) => ({
                    ...prev,
                    image: "Invalid file type. Please upload a JPG, JPEG, PNG, or GIF image.",
                }))
                return
            }

            // Clear any previous errors
            setFieldErrors((prev) => ({ ...prev, image: "" }))

            // Set the selected file
            setSelectedFile(file)

            // Create a preview
            const reader = new FileReader()
            reader.onload = () => {
                setPreviewSrc(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "image/gif": [".gif"],
        },
        maxFiles: 1,
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const validateForm = () => {
        const errors = {}

        if (!formData.name.trim()) {
            errors.name = "Username is required"
        }

        if (!formData.profession.trim()) {
            errors.profession = "Profession is required"
        }

        if (!formData.password) {
            errors.password = "Password is required"
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters"
        }

        if (!selectedFile) {
            errors.image = "Please upload a profile image"
        }

        return errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess("")

        // Validate form data
        const validationErrors = validateForm()
        if (Object.keys(validationErrors).length > 0) {
            setFieldErrors(validationErrors)
            setLoading(false)
            return
        }

        setFieldErrors({})

        try {
            // Create a FormData object to send the file
            const data = new FormData()
            data.append("name", formData.name)
            data.append("profession", formData.profession)
            data.append("password", formData.password)

            // Append the file to the FormData object
            if (selectedFile) {
                data.append("image", selectedFile)
            }

            const pushedData = {
                name: formData.name,
                profession: formData.profession,
                password: formData.password, 
                imageFile: selectedFile 
            }

            // Send the request to the backend
            const response = await axios.post("http://localhost:5001/signup", pushedData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })

            setSuccess(response.data.message || "Account created successfully!")

            // Navigate to login page after successful signup
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        } catch (error) {
            console.error("Error:", error)

            // Handle validation errors from the server
            if (error.response && error.response.data) {
                if (error.response.data.errors) {
                    // Extract field-specific errors
                    const serverErrors = error.response.data.errors
                    const formattedErrors = {}

                    // Format errors for each field
                    Object.keys(serverErrors).forEach((field) => {
                        formattedErrors[field] = serverErrors[field].message
                    })

                    setFieldErrors(formattedErrors)
                } else {
                    // General error message
                    setError(error.response.data.message || "An error occurred during signup")
                }
            } else {
                setError("Network error. Please try again later.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <FormCard>
                <Header>
                    <Title>Create Your AI Assistant Account</Title>
                    <Subtitle>Join our AI community today</Subtitle>
                </Header>

                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="name">Username</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter your username"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {fieldErrors.name && <ValidationError>{fieldErrors.name}</ValidationError>}
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="profession">Profession</Label>
                        <Input
                            id="profession"
                            name="profession"
                            type="text"
                            required
                            placeholder="What do you do?"
                            value={formData.profession}
                            onChange={handleChange}
                        />
                        {fieldErrors.profession && <ValidationError>{fieldErrors.profession}</ValidationError>}
                    </FormGroup>

                    <FormGroup>
                        <Label>Profile Image</Label>
                        <DropzoneContainer {...getRootProps()} isDragActive={isDragActive}>
                            <input {...getInputProps()} />
                            <UploadIcon>📷</UploadIcon>
                            <DropzoneText>
                                {isDragActive ? "Drop the image here..." : "Drag & drop an image here, or click to select one"}
                            </DropzoneText>
                            <DropzoneText>(JPG, JPEG, PNG, or GIF only)</DropzoneText>

                            {previewSrc && (
                                <ImagePreviewContainer>
                                    <ImagePreview src={previewSrc} alt="Preview" />
                                </ImagePreviewContainer>
                            )}
                        </DropzoneContainer>
                        {fieldErrors.image && <ValidationError>{fieldErrors.image}</ValidationError>}
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Create a secure password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {fieldErrors.password && <ValidationError>{fieldErrors.password}</ValidationError>}
                    </FormGroup>

                    <Button type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner /> Creating account...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </Button>
                </Form>

                <LinkText>
                    Already have an account? <StyledLink onClick={() => navigate("/login")}>Login</StyledLink>
                </LinkText>
            </FormCard>
        </Container>
    )
}

export default Signup
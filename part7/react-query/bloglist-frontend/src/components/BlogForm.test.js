import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
// import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"
import BlogForm from "./BlogForm"




test("calls handleAddBLog with the right details when a new blog is created", ()=>{
    const mockHandleAddBlog = jest.fn()

    render(<BlogForm  handleAddBlog={mockHandleAddBlog}/>)



    // get the form inputs and the submit button
    const titleInput   = screen.getByPlaceholderText("Enter title")
    const authorInput = screen.getByPlaceholderText("Enter author")
    const urlInput = screen.getByPlaceholderText("Enter url")
    const submitButton = screen.getByText("Save")


    // fill in the form inputs
    fireEvent.change(titleInput, {target:{ value:"Test title"}})
    fireEvent.change(authorInput, {target:{value:"Test author"}})
    fireEvent.change(urlInput, {target:{value:"www.example.com"}})
    

    // submit the form
    fireEvent.click(submitButton)

    //check if the handleAddblog function was called with the correct details
    // eslint-disable-next-line no-undef
    expect(mockHandleAddBlog).toHaveBeenCalledTimes(1)
    expect(mockHandleAddBlog).toHaveBeenCalledWith({
        title: "Test title",
        author: "Test author",
        url: "www.example.com"
    })

    //check if the form input are cleared after submission
    expect(titleInput.value).toBe("")
    expect(authorInput.value).toBe("")
    expect(urlInput.value).toBe("")
})
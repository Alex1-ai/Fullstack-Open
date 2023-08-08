import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import {render, screen, fireEvent} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"


test("renders content", ()=>{
    const blog = {
        title:"Test title",
        author:"test",
        url:"www.google.com",
        likes:2,
        user:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyb"
        

    }

    const { container } = render(<Blog blog={blog}  />)
    
    const div = container.querySelector(".blog")
    screen.debug(div)
    expect(div).toBeDefined()
    expect(div).toHaveTextContent("Test title")
    expect(div).toHaveTextContent("test")
})

test("renders blog", async()=>{
    const blog = {
        title:"Test title",
        author:"test",
        url:"www.google.com",
        likes:2,
        user:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyb"
        

    }

    // const mockHandler = jest.fn()

    render(<Blog blog={blog} />)
    
    // const user = userEvent.setup()
    // const button = screen.getByText("view")
    // await user.click(button)
    // expect(mockHandler.mock.calls).toHaveLength(4)
     const user = userEvent.setup()

    const viewButton = screen.getByText("view")
    expect(screen.queryByText(blog.url)).not.toBeInTheDocument()
    expect(screen.queryByText(blog.likes)).not.toBeInTheDocument()

    await user.click(viewButton)
    expect(screen.getByText(blog.url, blog.likes)).toBeInTheDocument()
    // expect(screen.getByText(blog.likes)).not.toBeInTheDocument()

    await user.click(viewButton)
    expect(screen.queryByText(blog.url)).not.toBeInTheDocument()


    const element = screen.getByText("Test title test :")
    screen.debug(element)
    expect(element).toBeDefined()

    // const { container } = render(<Blog blog={blog} />)

    // const div = container.querySelector(".blog")
    // expect(div).toHaveTextContent(
    //     "Test title "
    // )
})


test("calls updateBlog twice when like button is clicked twice", async()=>{
    const blog = {
        title: "Test title",
        author: "test",
        url: "www.google.com",
        likes: 2,
        user: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyb"

    }

    // Mock the updateBlog function
    const mockUpdateBlog = jest.fn()

    // Render the blog component  with the mockUpdateBlog
    render(<Blog blog={blog} updateBlog={mockUpdateBlog} />)
    const viewButton = screen.getByText("view")
    await userEvent.click(viewButton)
    // const likeButton= screen.getByRole("button",{name:"like/i"})
    const likeButton = screen.getByRole("button", {name:/like/i})

    //click th like button twice
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)
    // check if the updateBlog function was called twic
    expect(mockUpdateBlog).toHaveBeenCalledTimes(2)
})
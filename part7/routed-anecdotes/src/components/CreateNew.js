/* eslint-disable react/prop-types */
import React from 'react'
import { useField } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
const CreateNew = (props) => {
    const navigate = useNavigate()
    // const [content, setContent] = useState('')
    // const [author, setAuthor] = useState('')
    // const [info, setInfo] = useState('')
   
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const handleSubmit = (e) => {
        console.log('Hello1')
        e.preventDefault()
        // eslint-disable-next-line react/prop-types
        console.log('hello2')
        props.addNew({
            content,
            author,
            info,
            votes: 0
        })
        navigate('/')

    }

    const handleReset = (e)=>{
        e.preventDefault()
        content.reset()
        author.reset()
        info.reset()
      
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <div>
                        <Form.Label>Content</Form.Label>
                        {/* <input {...content} /> */}
                        <Form.Control name='content' type={content.type} value={content.value} onChange={content.onChange} />
                        {/* <input name='content' value={content} onChange={(e) => setContent(e.target.value)} /> */}
                    </div>
                    <div>
                        <Form.Label>Author</Form.Label>
                        {/* <input {...author} /> */}
                        <Form.Control name='author' type={author.type} value={author.value} onChange={author.onChange} />
                        {/* <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} /> */}
                    </div>
                    <div>
                        <Form.Label>Url for more info</Form.Label>
                        {/* <input {...info} /> */}
                        <Form.Control name='info' type={info.type} value={info.value} onChange={info.onChange} />
                        {/* <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} /> */}
                    </div>
                    <Button variant='primary' type='submit'>create</Button>
                    <Button variant='warning' onClick={handleReset}>reset</Button>
                </Form.Group>
            </Form>
        </div>
    )

}

export default CreateNew
import styled from "styled-components";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListProjectsPage() {
    const classes = [
        { id: 1, name: 'Turma 1' },
        { id: 2, name: 'Turma 2' },
        { id: 3, name: 'Turma 3' },
        { id: 4, name: 'Turma 4' },
    ]
    const [projects, setProjects] = useState([])
    const [classSelected, setClassSelected] = useState(1)
    const [projectSelected, setProjectSelected] = useState('Globo')
    const [deliveries, setDeliveries] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/projects`)
        promise.then((res) => setProjects(res.data))
        promise.catch((err) => console.log(err.response.data))

        const secondPromise = axios.get(`${process.env.REACT_APP_API_URL}/deliveries`)
        secondPromise.then((res) => setDeliveries(res.data))
        secondPromise.catch((err) => console.log(err.response.data))
    }, [])
    
    function loadStudentDelivery(id) {
        navigate(`/student/delivery/${id}`)
    }
    function doNothing(){}

    return (
        <>
            <Header />
            <Container>
                <SideBarClass>
                    <div>
                        {classes.map((c, i) => <Filter key={i} onClick={() => setClassSelected(c.id)} selected={classSelected === c.id ? true : false} >{c.name}</Filter>)}
                    </div>
                    <div>
                        {projects.map((p, i) => <Filter key={i} onClick={() => setProjectSelected(p.projectname)} selected={projectSelected === p.projectname ? true : false} >{p.projectname}</Filter>)}
                    </div>
                </SideBarClass>
                <Content>
                    <h2>Projeto {projectSelected} na Turma {classSelected}</h2>
                    {deliveries.filter((d) => d.classid === classSelected && d.projectname === projectSelected).map((s, i) => {
                        console.log(s.grade)
                        return (
                            <StudentCard key={i} >
                                <div>
                                    <img src={s.picture} alt={s.studentName} />
                                    <h4>{s.studentName.toUpperCase()}</h4>
                                </div>
                                <div>
                                <p>Link da Entrega:</p>
                                <a href={s.projecturl}>{s.projecturl}</a>
                                </div>
                                
                                <h5 onClick={s.grade ? doNothing : () => loadStudentDelivery(s.id)}>{s.grade ? s.grade : 'Sem nota'}</h5>
                            </StudentCard>
                        )
                    })}
                </Content>
            </Container>
        </>
    )
}
const SideBarClass = styled.div`
    width: 7%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 40px;
    border-right: solid 1px #606060;
    div {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }
`
const Container = styled.div`
    display: flex;
`

const Filter = styled.h3`
    cursor: pointer;
    border-bottom: ${(props) => (props.selected === true ? "solid 1px #696969" : 'none')};
    color: ${(props) => (props.selected === true ? 'black' : '#606060')};
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 25px;
    padding: 30px;
`

const StudentCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    width: 80vw;
    height: 50px;
    border: solid 1px #696969;
    gap: 0 15px;
    img {
        width: 25px;
        height: 25px;
        border-radius: 100%;
    }
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
    }
    h5 {
        cursor: pointer;
        font-weight: 700;
    }
    a {
        text-decoration: none;
        color: #696969;
    }
`

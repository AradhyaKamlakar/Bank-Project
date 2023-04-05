import React, { createContext, useEffect, useState } from 'react'
import { Api } from '../../../Utils/Api'

import ResponsiveDialog from './CreateServiceModel'
import ServicesList from './ServicesList'



export const ServicesContext = createContext()

const Services = () => {

    const [data, setData] = useState([])

    const [open, setOpen] = useState(false)

    const getData = async () => {

        try {

            Api.service.getServices().then((data) => {
                setData(data);
            })

        } catch (error) {

        }

    }


    useEffect(() => {
        getData();
    }, [])



    const [service, setService] = useState({
        Id: '',
        Name: '',
        Time: '',
    })

    const AddService = async () => {
        if (service.Id !== '') {

            // to update the service

            await Api.service.updateService({
                Id: service.Id,
                Name: service.Name,
                Time: parseInt(service.Time),
            })
            
            getData();


        } else {

            // to add a new service

            await Api.service.addService({
                Id: service.Id,
                Name: service.Name,
                Time: parseInt(service.Time),
            });

            getData();
        }
    }

    const deleteService = async (service) => {

        await Api.service.deleteService({
            Id: service.Id
        })

        getData();

    }

    return (
        <ServicesContext.Provider value={{
            data,
            setData,
            AddService,
            deleteService,
            service,
            setService,
            open,
            setOpen
        }} >
            <div className='mb_1' >
                <h1 className='mb_1' >Welcome !</h1>
                <h2>Manager Name</h2>
            </div>
            <div className='mb_1' >
                <ResponsiveDialog />

            </div>
            <div>
                <ServicesList />
            </div>
        </ServicesContext.Provider>
    )
}

export default Services
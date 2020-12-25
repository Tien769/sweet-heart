import {React, useState} from 'react'
import Modal from 'react-modal'
import DetailProduct from '../Components/DetailProduct'
export default function TestModelReact() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    return (
        <div>
            <button onClick={() => setModalIsOpen(true)} >Mở chi tiết sản phẩm</button>
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)}
                style={
                    {
                        overlay: {
                            backgroundColor: 'rgba(52, 52, 52, 0.8)',
                        }
                    }
                }    
            >
                <DetailProduct />
            </Modal>
        </div>
    )
}

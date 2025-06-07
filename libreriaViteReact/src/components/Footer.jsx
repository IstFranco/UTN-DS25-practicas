import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'

export default function Footer() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleOpen = (type) => {
        if (type === 'copyright') {
            setModalContent(
                <div>
                    <h2 className='text-xl font-bold mb-2'>© 2025 Alejandria FO</h2>
                    <p>Todo el contenido está protegido por derechos de autor. Reproducción parcial o total prohibida sin consentimiento.</p>
                </div>
            );
        } else if (type === 'terms') {
            setModalContent(
                <div>
                    <h2 className='text-xl font-bold mb-2'>Terminos y condiciones</h2>
                    <p>Este sitio es solo con fines educativos. Al utilizar la plataforma, aceptás nuestras políticas de uso y privacidad.</p>
                </div>
            );
        }
        setModalOpen(true);
    }

    return (
        <footer className='text-white p-10 text-center' style={{ backgroundColor: '#3d1f12' }}>
            <div className="flex flex-col items-center gap-3">
                <div className="flex gap-6">
                    <button onClick={() => handleOpen('copyright')} className='hover:underline'>
                        © 2025 Alejandria FO
                    </button>
                    <button onClick={() => handleOpen('terms')} className="hover:underline">
                        Términos y condiciones
                    </button>
                </div>
                <div className='flex gap-6 mt-3'>
                    {/*<a href= target='_blank' rel='noreferrer' >Instagram</a>*/}
                    <a href='https://github.com/IstFranco' target='_blank' rel='noreferrer' >GitHub</a>
                    <span className="text-white">×</span>
                    <a href='https://www.linkedin.com/in/franco-oyhenart-a4573b2aa/' target='_blank' rel='noreferrer' >linkedin</a>
                </div>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                {modalContent}
            </Modal>
        </footer>
    )
}

import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { RiCloseFill } from 'react-icons/ri'
import styles from './Modal.module.scss'

const Modal = ({ closeModal, isOpen, children }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    modalRef.current = document.getElementById('modal')
  }, [])

  if (!isOpen || !modalRef.current) return null

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.window}>
        <button className={styles.closeBtn} onClick={closeModal}>
          <RiCloseFill style={{ marginBottom: '-3px' }} />
        </button>
        {children}
      </div>
    </div>,
    modalRef.current,
  )
}

export default Modal

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}

const Modal = ({ children, onClose, title }: Props) => (
  <>
    <div className="modal-cover" onClick={onClose}></div>
    <div className="modal">
      <div className="modal__head">{title}</div>
      <div className="modal__content">{children}</div>
    </div>
  </>
);

export default Modal;

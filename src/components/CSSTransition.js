import { CSSTransition } from 'react-transition-group';

const Fade = ({children}) =>
    <CSSTransition
        in={true}
        appear={true}
        unmountOnExit={true}
        timeout={300}
        classNames={{
            appear: 'opacity-0',
            appearActive: 'transition-opacity duration-300 opacity-100',
            enter: 'opacity-0',
            enterActive: 'transition-opacity duration-300 opacity-100',
            exit: 'opacity-100',
            exitActive: 'transition-opacity duration-300 opacity-0',
        }}>
        {children}
    </CSSTransition>

export default Fade
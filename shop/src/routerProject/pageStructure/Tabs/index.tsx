import {
    createContext,
    FC,
    MouseEvent,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from 'react';
import './styles.css';

interface ITabsContext {
    activeName?: string;
    handleTabClick?: (activeName: string, content: ReactNode) => void;
}

interface ITabProps {
    name: string;
    initialActive?: boolean;
    heading: () => string | JSX.Element;
}

interface IState {
    activeName?: string;
    activeContent?: ReactNode;
}

const TabsContext = createContext<ITabsContext>({});

export const Tab: FC<ITabProps> = ({
    name,
    initialActive,
    heading,
    children,
}) => {
    const context: ITabsContext = useContext(TabsContext);
    const activeName = context?.activeName || (initialActive ? name : '');
    const handleTabClick = useCallback((e: MouseEvent<HTMLLIElement>) => {
        context.handleTabClick?.(name, children);
    }, []);

    if (!context.activeName && initialActive) {
        context.handleTabClick?.(name, children);
        return null;
    }

    return (
        <li
            className={activeName === name ? 'active' : ''}
            onClick={handleTabClick}
        >
            {heading()}
        </li>
    );
};

export const Tabs: FC = ({ children }) => {
    const [state, updateState] = useState<IState>();
    const handleTabClick = useCallback(
        (activeName: string, activeContent: ReactNode) => {
            updateState({ activeName, activeContent });
        },
        []
    );

    return (
        <TabsContext.Provider
            value={{
                activeName: state?.activeName ?? '',
                handleTabClick,
            }}
        >
            <ul className="tabs">{children}</ul>
            <div>{state?.activeContent}</div>
        </TabsContext.Provider>
    );
};

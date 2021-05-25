import React, { useContext } from 'react';

const Context = React.createContext();

class Store extends React.Component {
  state = this.props.state || {};
  
  render() {
    const { children } = this.props;
    return ( 
      <Context.Provider
        value={{
          ...this.state,
          setStore: this.setState.bind(this)
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}

const useStore = () => {
  const {
    setStore = () => console.log('Wrap your root component with `Store`'),
    ...store
  } = useContext(Context);
  return [store, setStore];
};

const withStore = WrappedComponent => {
  return props => {
    const [store, setStore] = useStore();
    return (
      <WrappedComponent 
        {...props}
        STORE={store}
        SET_STORE={setStore}
      />
    );
  };
};


export default Store;
export { useStore, withStore };

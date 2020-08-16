https://stackoverflow.com/questions/56419342/react-do-hooks-replace-hocs-and-render-props

In the following example, the goal is to get the window width, including the state-management and event listening involved with that.

HOC version

```react
function withWindowWidth(BaseComponent) {
  class DerivedClass extends React.Component {
    state = {
      windowWidth: window.innerWidth,
    }
    onResize = () => {
      this.setState({
        windowWidth: window.innerWidth,
      })
    }
    componentDidMount() {
      window.addEventListener('resize', this.onResize)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
    }
    render() {
      return <BaseComponent {...this.props} {...this.state}/>
    }
  }
  // Extra bits like hoisting statics omitted for brevity
  return DerivedClass;
}

// To be used like this in some other file:
const MyComponent = (props) => {
  return <div>Window width is: {props.windowWidth}</div>
};

export default withWindowWidth(MyComponent)
```

Render prop version

```react
class WindowWidth extends React.Component {
  propTypes = {
    children: PropTypes.func.isRequired
  }
  state = {
    windowWidth: window.innerWidth,
  }
  onResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
    })
  }
  componentDidMount() {
    window.addEventListener('resize', this.onResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }
  render() {
    return this.props.children(this.state.windowWidth);
  }
}

// To be used like this:

const MyComponent = () => {
  return (
    <WindowWidth>
      {width => <div>Window width is: {width}</div>}
    </WindowWidth>
  )
}
```

hook version

```react
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [])
  return width;
}

// To be used like this:
const MyComponent = () => {
  const width = useWindowWidth();
  return <div>Window width is: {width}</div>;
}
```


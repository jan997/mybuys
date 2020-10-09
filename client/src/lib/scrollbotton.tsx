import React from 'react';

import { Loading } from "../components/loading";

type MyProps = {
    delay?: number,
    show?: boolean,
    root_query?:any,
    scroll_active?: HTMLElement,
    loading?: JSX.Element,
    event(sb: ScrollBotton): void,
    auto_loading_hidden?: number
};

type MyState = {
    show: boolean
};

export class ScrollBotton extends React.Component<MyProps, MyState> {
    root = React.createRef<HTMLDivElement>();
    scroll_active: any;
    state = {
        show : true
    };

    isSee() {
        const {root} = this;
        if(root && root.current){
            return root.current.getBoundingClientRect().bottom <= window.innerHeight;
        }
         return false;
    }
      
    componentDidMount() {
        const {delay} = this.props;
        if(delay){
            setInterval(() => {
                this.addEvent();
            }, delay);
            return;
        }
        this.addEvent();
    }
      
    componentWillUnmount() {
        this.removeEvent();
    }

    

    addEvent(){
        const {root_query} = this.props;
        if(this.scroll_active) return;
        this.scroll_active = true;

        let root = document;
        if(root_query) root = document.querySelector(root_query);
        root.addEventListener('scroll', this.trackScrolling);
        setTimeout(() => {
            this.setState({show:false});
            this.forceUpdate();
        }, 1000);
    }
    removeEvent(){
        const {root_query} = this.props;
        if(!this.scroll_active) return;
        this.scroll_active = false;

        let root = document;
        if(root_query) root = document.querySelector(root_query);
        root.removeEventListener('scroll', this.trackScrolling);
    }

    end(){
        this.setState({show:false})
    }

    trackScrolling = () => {
        console.log(window.innerHeight, window.scrollY,window.pageYOffset)
        if (this.isSee()) {
            const {event} = this.props;
            this.removeEvent();
            if(!event) throw new Error("Te falta la function() en 'event' del ScrollBotton");
            event(this);
            this.setState({show:true})
        }
    }

    render(){
        const {loading} = this.props;
        const {show} = this.state;

        console.log("A2", !show);
        return (
            <>
                {show&&this.props.show!==false?(
                    <div ref={this.root} className="ScrollLoading">
                        {
                            loading?loading:(
                                <Loading margin={0}></Loading>
                            )
                        }
                    </div>
                ):null}
            </>
        );
    }
}

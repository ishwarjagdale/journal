import React from 'react';
import {notify} from "../js/notifier";

class StoryCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className={`flex flex-wrap md:flex-nowrap md:px-4 md:py-2 max-w-[1024px] md:min-w-[740px] rounded-2xl justify-start max-w-4xl pb-4 border-b mb-4 md:mb-0 md:border-0`}>
                    <div className={"relative"}>

                        <a href={this.props.post.url} className={"relative"}>
                            <img className={`aspect-[2/1] md:aspect-[5/3] md:max-h-[180px] object-cover w-full w-auto mb-2 md:m-4 rounded-md`}
                                 src={this.props.post.thumbnail.url}
                                 alt={"featured-story-thumbnail"}/>
                        </a>
                    </div>
                    <div className={"md:p-4 flex-1 flex flex-col w-full md:w-6/12 lg:max-w-[600px] justify-center px-2"}>
                        <div className={"flex my-2"}>
                            <a href={this.props.post.author.url} className={"flex items-center"}>
                                <img className={"rounded-full mr-2 w-[24px] aspect-square"}
                                     src={this.props.post.author.img}
                                     alt={"author"}/>
                                <span className={"mr-2 text-sm font-medium"}>{this.props.post.author.name}</span>
                            </a>
                        </div>
                        <a href={this.props.post.url}>
                            <h3 className={"text-xl font-ubuntu mt-2 font-bold"}>{this.props.post.title}</h3>
                        </a>
                        <p className={`mt-2 font-medium text-[#535353] font-ssp text-[15px] w-full max-h-[20px] md:max-h-[44px] lg:h-auto lg:overflow-visible overflow-hidden`}>{this.props.post.subtitle}
                        </p>
                        <div className={"flex my-2 items-center"}>
                            <span className={"story-meta"}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <i>{new Date(this.props.post.meta.date_published).toDateString()}</i>
                            </span>
                            <span className={"separator-dot"}/>
                            <span className={"story-meta"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <i>{Math.ceil(this.props.post.meta.read_time / 200)} min read</i>
                            </span>
                            <span className={"separator-dot"}/>
                            <div className={"story-meta"}>
                                <span>{this.props.post.meta.tag.split(" ")[0]}</span>
                            </div>
                            <span className={"separator-dot"}/>
                            <div className={"story-meta"}>
                                <svg onClick={() => {
                                    try {
                                        let stories = localStorage.getItem("saved-stories");
                                        if(this.props.saved) {
                                            stories.replace(this.props.post.id.toString(), "");
                                            localStorage.setItem("saved-stories", stories);
                                            notify(`"${this.props.post.title}" removed!`, "info");
                                            this.componentWillUnmount();
                                        } else {
                                            if(!stories) {stories = new Set([this.props.post.id])} else {stories = new Set([this.props.post.id.toString(), ...stories.split(" ")])}
                                            console.log(stories);
                                            localStorage.setItem('saved-stories', [...stories].join(" "));
                                            notify(`"${this.props.post.title}" saved!`, "success");
                                        }
                                    } catch (e) {
                                        console.log(e);
                                        notify("Something went wrong, try again later!", "failed");
                                    }
                                }} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 hover:fill-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="grey">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </div>
                        </div>
                        { this.props.featured && <div className={"view-btn"}>
                            <hr className={"backline"}/>
                            <span>View Story</span></div>
                        }
                        { this.props.featured && <div className={"flex mt-4"}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                            </svg>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }

}

export default StoryCard;
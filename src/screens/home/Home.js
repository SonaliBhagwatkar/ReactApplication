import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


//Styles for representing different restaurant images information fields Home page 
const styles = theme => ({
    nullRestaurantList: {
        marginTop: 15,
        marginLeft: 25,
    },
        restaurantCard: {
        width: 700,
        maxWidth: 1000,
        height: 600,
        maxHeight: 1000,
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 25,
        marginRight: 0,
        paddingBottom: 15,
        cursor: 'pointer',
    },
    });



class Home extends Component {

    constructor(props) {
        super(props);
        this.baseUrl = "http://localhost:8080/api";
        this.state = {
            restaurants: [],
            cards: 4,
            arrIndex: 0,
            inputValue: '',
            images: [],
        }
        this.changeImage = this.changeImage.bind(this);
    }

    //Setting the delay of 1sec after image is rendered on home page

    componentDidMount() {
        this.timeout = setTimeout(
            this.changeImage,
            this.props.animationPeriod * 2000
        )
    }

    //Clearing the set timer

    componentWillUnmount() {
        if (this.timeout) clearTimeout(this.timeout)
    }

    //Function to iterate through image array to display the next image
    changeImage() {
        this.setState(function ({ arrIndex }) {
            const nextArrIndex = ++arrIndex % this.state.restaurants.length
            return { arrIndex: nextArrIndex }
        }, function () {
            this.timeout = setTimeout(
                this.changeImage,
                this.props.animationPeriod * 2000
            )
        })
    }


    //Calling get all restaurant /restaurant API to get all the restaurants images with their entire details
    UNSAFE_componentWillMount() {
        //get restaurants from API 
        let that = this;
        let dataRestaurants = null;
        let xhrRestaurants = new XMLHttpRequest();
        xhrRestaurants.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                console.log(JSON.parse(this.responseText));
                that.setState({ restaurants: JSON.parse(this.responseText).restaurants });
            }
        })
        xhrRestaurants.open('GET', this.baseUrl + "/restaurant");
        xhrRestaurants.send(dataRestaurants);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />
                {this.state.restaurants === null ?
                    <Typography className={classes.nullRestaurantList} variant='h6'>
                        No restaurant with the given name.
                    </Typography>
                    :
                    <div>
                        {this.state.restaurants.map(restaurant => {
                            // return <img className={classes.restaurantCard} key={restaurant.id} src={restaurant.photo_URL} alt={restaurant.restaurant_name}/>
                             this.state.images.push(restaurant.photo_URL);
                        }

                        )}
                      { // {console.log(this.state.images)}
                    }
                        <div>
                            <img className={classes.restaurantCard} src={this.state.images[this.state.arrIndex]} alt={this.state.images[this.state.arrIndex]} />
                        </div>
                    </div>

                }

            </div>
        )
    }

}

export default withStyles(styles)(Home);





import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const HistoryPage = () => {
    const purchasedOrder = JSON.parse(localStorage.getItem("comprinhas"));
    console.log(purchasedOrder);

    return (
        purchasedOrder.map((order) => {
            return (
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Voce comprou estes items aqui
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {
                                purchasedOrder.map((item) => {
                                return (
                                    <>
                                        {/* <p>{item.quantity} {item.description}</p> */}
                                    </>
                                )   
                                })
                            }
                            <p>O valor total da compra foi de: R$ {'dsad'}</p>
                        </Typography>
                    </CardContent>
                    {/* <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions> */}
                    </Card>
            )
        })
      );
};

export default HistoryPage;
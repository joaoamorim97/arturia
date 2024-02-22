import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const HistoryPage = () => {
    const purchasedOrder = JSON.parse(localStorage.getItem("comprinhas"));

    return (
        purchasedOrder.map((order) => {
            return (
                <Card sx={{ maxWidth: 345 }} style={{marginLeft: '10px'}}>
                    <CardMedia
                        sx={{ height: 50 }}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Voce comprou estes items aqui
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {
                                order.map((item) => {
                                    return (
                                        <>
                                            <p>{item.quantity}x '{item.description}', no valor de R$ {item.totalPrice} </p>
                                        </>)   
                                })
                            }
                        </Typography>
                    </CardContent>
                </Card>
            )
        })
      );
};

export default HistoryPage;
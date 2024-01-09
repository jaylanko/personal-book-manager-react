// BookTiles.js
import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";

const FixedSizeCard = styled(Card)({
  maxWidth: 345,
  width: 345,
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export default function BookTiles({ book, onRemove,  onToggleFavorite, isFavorite}) {
    const handleRemoveClick = () => {
        onRemove(book);
      };

      const handleFavoriteClick = () => {
        onToggleFavorite(book);
      };

      
  return (
    <FixedSizeCard>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleRemoveClick}>
            <CloseIcon />
          </IconButton>
        }
        title={book.name}
        subheader={book.date}
      />
      <CardMedia
        component="img"
        height="194"
        objectFit="cover"
        image={book.picture}
        alt={book.name}
      />
      <CardContent style={{ flex: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {book.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleFavoriteClick}
          color={isFavorite ? "secondary" : "default"}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </FixedSizeCard>
  );
}

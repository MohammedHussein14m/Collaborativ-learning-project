import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { Grid, Paper, makeStyles, Avatar } from "@material-ui/core";
import QuestionDialog from "shared/components/QuestionDialog/QuestionDialog";
import CategorySection from "./CategorySection/CategorySection";
import Question from "../../../shared/components/Question/Question";
import NoQuestions from "shared/components/EmptyContent/NoQuestions";
import userImage from "assets/img/default-avatar.png";
import style from "../style/style";

const useStyle = makeStyles(style);

function QuestionsLayout({ categories, categoryId, store }) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [categoryData, setCategoryDate] = useState({});
  const [questionsData, setQuestionsData] = useState([]);

  const { fetchCategory, category } = store.categoriesStore;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    async function getData(categoryId) {
      await fetchCategory(categoryId);
      await category.fetchQuestions(categoryId);
      setCategoryDate(category);
      const sortedQuestions = category.questions
        .slice()
        .sort((a, b) => b.createdAt - a.createdAt);
      setQuestionsData(sortedQuestions);
    }
    getData(categoryId);
  }, [categoryId, category, fetchCategory]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={3} className={classes.container}>
      <Grid item xs={8}>
        <Paper>
          <div className={classes.questionForm} onClick={handleClickOpen}>
            <Avatar alt="Remy Sharp" src={userImage} />
            <div style={{ marginLeft: 20 }}>
              <div className={classes.questionFormTitle}>
                What's your question ?
              </div>
              <div className={classes.questionFormSubTitle}>
                Write a question now !
              </div>
            </div>
          </div>
          <QuestionDialog
            open={open}
            handleClose={handleClose}
            addQuestion={categoryData.addQuestion}
            categoryId={categoryId}
          />
        </Paper>
        <div className={classes.mainText}>TOP Questions</div>
        {questionsData.length === 0 ? (
          <NoQuestions text="No Questions Here" />
        ) : (
          <div style={{ marginTop: 20 }}>
            {questionsData.map(question => (
              <Question question={question} />
            ))}
          </div>
        )}
      </Grid>
      <Grid item xs={4}>
        <CategorySection categories={categories} categoryId={categoryId} />
      </Grid>
    </Grid>
  );
}

export default inject("store")(observer(QuestionsLayout));

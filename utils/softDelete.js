exports.deleteById = async (Model, targetDocId, deletedById) => {
  const targetDoc = await Model.findById(targetDocId);
  if (!targetDoc) {
    return undefined;
  }

  //promisify it!
  return new Promise((resolve) => {
    targetDoc.delete(deletedById, (err, doc) => {
      resolve(doc);
    });
  });
};

exports.restoreById = async (Model, targetDocId) => {
  //find deleted doc
  const targetDoc = await Model.findOneDeleted({ _id: targetDocId });

  if (!targetDoc) {
    return undefined;
  }

  //promisify it!
  return new Promise((resolve) => {
    targetDoc.restore((err, doc) => {
      resolve(doc);
    });
  });
};

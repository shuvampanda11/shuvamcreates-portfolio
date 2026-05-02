actor {
  var pageViews : Nat = 0;

  public shared func recordPageView() : async Nat {
    pageViews += 1;
    pageViews;
  };

  public shared query func getPageViews() : async Nat {
    pageViews;
  };
};
